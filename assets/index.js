const splitTags = "。？！……——"

window.onload = () => {

    const one = document.querySelector('#one')
    const two = document.querySelector('#two')

    const textarea = document.querySelector('textarea')


    // 清理文本
    document.querySelector('#cleartext').addEventListener('click', () => {
        if (textarea.value === '') {
            return
        }
        const t = setTimeout(() => {
            textarea.value = ''
            clearTimeout(t)
        }, 200)
    })

    // 排版
    document.querySelector('#typesetting').addEventListener('click', () => {

        // 获取文本
        const text = textarea.value.trim()

        if (text === '') {
            return
        }

        const lines = text.split(/[\n]+/g)

        const ps = []

        lines.forEach((line) => {
            line = line.trim()
            if (line === '') {
                return
            }
            if (line.match(/[。？！]+/g).length <= 1) {
                ps.push(`<p>${line}</p>`)
                return
            }
            const rows = line.split(/[。？！]+/g)
            rows.forEach((row) => {
                row = row.trim()
                if (row === '') {
                    return
                }
                ps.push(`<p>${row}</p>`)
            })
        })

        two.innerHTML = ps.join('\n')


        one.classList.remove('show')
        one.classList.add('hide')
        two.classList.remove('hide')
        two.classList.add('show')
    })




}