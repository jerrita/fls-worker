interface Env {
    BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    let data = {};

    try {
        const req = await context.request.json();

        let pf: string = req['prefix']
        if (!pf.endsWith('/')) pf += '/';
        while (pf.startsWith('/')) pf = pf.slice(1);

        console.log('Prefix: ' + pf)
        const option: R2ListOptions = {
            prefix: pf,
            delimiter: '/'
        }
        const list = await context.env.BUCKET.list(option)

        let files = []
        // console.log(list)
        list.objects.forEach((value, _) => {
            const fn = value.key.slice(pf.length);
            if (!fn.startsWith('.'))
                files.push({
                    name: fn,
                    type: 'file'
                })
        })

        list.delimitedPrefixes.forEach((value, _) => {
            const fn = value.slice(pf.length);
            if (!fn.startsWith('.'))
                files.push({
                    name: fn,
                    type: 'dir'
                })
        })

        data['files'] = files
        // console.log(data)
    } catch (e) {
        console.log(e)
        data = {
            'code': -1,
            'msg': e.message
        }
    }


    const json = JSON.stringify(data, null, 2)
    return new Response(json, {
        'headers': {
            'content-type': 'application/json;charset=UTF-8'
        }
    });
}