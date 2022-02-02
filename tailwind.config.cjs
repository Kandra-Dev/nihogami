module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  theme: {
    screens: {
      'mobile': {'max': '1024px'},
    },
    colors: {
      'yellow': '#ffcd03',
      'dark-yellow': '#f9b81a',
      'orange': '#f57840',
      'dark-orange': '#d05226',
      'red': '#ca424f',
      'dark-red': '#951f1f',
      'pink': '#e59ab6',
      'dark-pink': '#d25383',
      'purple': '#a9a3cf',
      'dark-purple': '#9183b2',
      'blue': '#90cfd4',
      'dark-blue': '#5ac3d9',
      'marine': '#438889',
      'dark-marine': '#036273',
      'green': '#b9cb65',
      'dark-green': '#73854a',
      'beige': '#fcfbf6',
      'dark-beige': '#ece9e0',
      'gray': '#69696c',
      'dark-gray': '#3b393c',
    },
    extend: {
      height: {
        '50': '50px'
      }
    }
  }
}