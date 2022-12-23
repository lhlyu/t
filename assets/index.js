

const opens = ['(','[','{','<',"'",'"','（','【','《','『','「', '“', "‘"]
const closes = [')',']','}','>',"'",'"','）','】','》','』','」', '”', "’"]

const ends = ['!','?','。','！','？','\n','　']

function splitText(text) {

    const lines = []
    let open = 0
    let start = 0
    let index = 1
    for (let i = 0; i < text.length; i++) {
        let use = false
        let close = false
        const c = text.charAt(i)
        if (opens.includes(c)) {
            open++
            use = true
        }
        if (closes.includes(c) && !use) {
            open--
            if (open <= 0) {
                open = 0
                close = true
            }
        }
        if (open && i < (text.length - 1)) {
            continue
        }

        if (close || ends.includes(c) || i === text.length - 1) {
            if (ends.includes(text.charAt(i + 1))) {
                i ++
            }
            const s = text.slice(start, i+1).trim()
            if (s !== '') {
                const t = `<p>${s}</p>`
                lines.push(t)
            }
            start = i + 1
        }
    }
    return lines
}




window.onload = () => {

    const one = document.querySelector('#one')
    const textarea = document.querySelector('textarea')

    const two = document.querySelector('#two')
    const container = document.querySelector('#container')


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

        const lines = splitText(text)

        container.innerHTML = lines.join('\n')

        one.classList.remove('show')
        one.classList.add('hide')
        two.classList.remove('hide')
        two.classList.add('show')
    })


    document.querySelector('#top').addEventListener('click', () => {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })


    document.querySelector('#back').addEventListener('click', () => {
        two.classList.remove('show')
        two.classList.add('hide')
        one.classList.remove('hide')
        one.classList.add('show')
    })


    document.querySelector('#bottom').addEventListener('click', () => {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        })
    })

}