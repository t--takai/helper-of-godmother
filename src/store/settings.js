const alphabetRaw = [
  ...'あいうえおかきくけこさしすせそたちつてとなにぬねの',
  ...'はひふへほまみむめもやゆよらりるれろわをん',
]
const defaultAlphabetObj = alphabetRaw.map((val) => {
  // デフォルトでいくつか選択させておく
  // return { key: val, enabled: [...'いろはに'].includes(val) }
  return { key: val, enabled: false }
})

/**
 * @param {*[]} permutationOptions
 * @param {number} permutationLength
 * @return {*[]}
 */
export function permuteWithRepetitions(
  permutationOptions,
  permutationLength = permutationOptions.length
) {
  if (permutationLength === 1) {
    return permutationOptions.map((permutationOption) => [permutationOption])
  }

  // Init permutations array.
  const permutations = []

  // Get smaller permutations.
  const smallerPermutations = permuteWithRepetitions(
    permutationOptions,
    permutationLength - 1
  )

  // Go through all options and join it to the smaller permutations.
  permutationOptions.forEach((currentOption) => {
    smallerPermutations.forEach((smallerPermutation) => {
      permutations.push([currentOption].concat(smallerPermutation).join(''))
    })
  })

  return permutations
}

// like data
export const state = () => ({
  alphabetList: defaultAlphabetObj,
  generateNameLength: 2,
})

// like computed
export const getters = {
  alphabetListFirst(state) {
    return state.alphabetList.slice(0, 25)
  },
  alphabetListLast(state) {
    return state.alphabetList.slice(25)
  },
  listAlphabetEnabled(state) {
    const targetList = state.alphabetList.filter((char) => {
      return char.enabled
    })
    return targetList
  },
  isEmptySelection(_state, getters) {
    return getters.listAlphabetEnabled.length <= 0
  },
  isSelectedAll(state, getters) {
    return getters.listAlphabetEnabled.length >= state.alphabetList.length
  },
  hasSelection(_state, getters) {
    return getters.listAlphabetEnabled.length > 0
  },
  countAlphabetEnabled(_state, getters) {
    return getters.listAlphabetEnabled.length
  },
  countGenerateNames(state, getters) {
    return getters.countAlphabetEnabled ** state.generateNameLength
  },
}

// like setters
export const mutations = {
  setEnableChar(state, index) {
    state.alphabetList[index].enabled = true
  },
  setDisableChar(state, index) {
    state.alphabetList[index].enabled = false
  },
  setNameLength(state, num) {
    state.generateNameLength = num
  },
}

// like methods
export const actions = {
  generateNameList({ state, getters, dispatch }) {
    const listEnabled = getters.listAlphabetEnabled.map((obj) => {
      return obj.key
    })
    const nameLength = state.generateNameLength
    const listGenerated = permuteWithRepetitions(listEnabled, nameLength)

    dispatch('name-list/updateList', listGenerated, { root: true })
    dispatch('modal/closeModal', null, { root: true })

    this.$router.push('/')
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  },
  unselectAll({ commit, state }) {
    state.alphabetList.forEach((_val, i) => {
      commit('setDisableChar', i)
    })
  },
  selectAll({ commit, state }) {
    state.alphabetList.forEach((_val, i) => {
      commit('setEnableChar', i)
    })
  },
  toggleChar({ commit, state }, key) {
    const targetIndex = state.alphabetList.findIndex((char) => {
      return char.key === key
    })
    if (state.alphabetList[targetIndex].enabled) {
      commit('setDisableChar', targetIndex)
    } else {
      commit('setEnableChar', targetIndex)
    }
  },
  changeLength({ commit }, key) {
    commit('setNameLength', key)
  },
}