document.addEventListener('DOMContentLoaded', function () {
  const codeBlocks = document.querySelectorAll('pre code')
  codeBlocks.forEach((block) => {
    const pre = block.parentNode

    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    pre.parentNode.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const button = document.createElement('button')
    button.textContent = 'Copy'
    button.className = 'copy-button'
    button.addEventListener('click', () => {
      const textToCopy = block.innerText
      navigator.clipboard.writeText(textToCopy).then(() => {
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 2000)
      }).catch(err => {
        console.error('Failed to copy: ', err)
      })
    })
    wrapper.insertBefore(button, pre)
  })
})
