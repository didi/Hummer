export function renderFunc(__Hummer__, __GLOBAL__){

    const doc = __Hummer__.document;
    const root = doc.createElement('View');
    root.setStyles({
        'top':0,
        'left':0,
        'width':'100%',
        'height':'100%'
    })

    {
        const view = doc.createElement('View');
        view.setStyles({
            'width':'200',
            'height':'200',
            'backgroundColor':'#f0f0f0',
            'position':'absolute'
        })
        root.appendChild(view)
        view.addEventListener('pan')
        let x = 0;
        let y = 0;
        view.setEventTarget((e, event)=>{
            y += event.translation.deltaY
            x += event.translation.deltaX
            view.setStyles({
                'transform':`translate(${x},${y})`,
            })
            console.log('Hummer',x.toString(), y.toString())
        })
    }

    {
        const view = doc.createElement('View');
        view.setStyles({
            'width':'100',
            'height':'100',
            'backgroundColor':'#e1e1e1'
        })
        // root.appendChild(view)
        view.addEventListener('tap')
        view.setEventTarget((e)=>{
            console.log('click 2')
            view.setStyles({
                'backgroundColor':'#f0f0f0',
            })
            // view.removeEventListener('tap')
        })
    }
    doc.render(root);
}