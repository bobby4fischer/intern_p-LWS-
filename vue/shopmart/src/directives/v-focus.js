// This directive will automatically focus on the element it's applied to when that element is mounted to the DOM.
export const vFocus = {
    mounted: (el) => {
      el.focus()
    }
  }