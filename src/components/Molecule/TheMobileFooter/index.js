import LinkTextWithIcon from '@/components/Molecule/LinkTextWithIcon/index.vue'
import NuxtLinkTextWithIcon from '@/components/Molecule/NuxtLinkTextWithIcon/index.vue'

export default {
  name: 'TheMobileFooter',
  components: {
    LinkTextWithIcon,
    NuxtLinkTextWithIcon,
  },
  props: {
    bindStatus: {
      type: String,
      default: 'Vuex Binding',
    },
    repoUrl: {
      type: String,
      default: 'https://github.com/nuxt/nuxt.js',
    },
    authorName: {
      type: String,
      default: 'Author Name',
    },
    authorPosition: {
      type: String,
      default: 'UI Designer / Front-end Engineer',
    },
    twitterUrl: {
      type: String,
      default: 'https://twitter.com/nuxt_js',
    },
  },
  computed: {
    repoName() {
      const arr = this.repoUrl.split('/')
      const lastOne = arr.length - 1
      return arr[lastOne]
    },
    twitterName() {
      const arr = this.twitterUrl.split('/')
      const lastOne = arr.length - 1
      return '@' + arr[lastOne]
    },
  },
}
