<script src="./index.js"></script>
<template lang="pug">
  transition-group(
    appear
    tag="div"
    :class="$style.wrapper"
  )
    div(
      v-text="theName"
      key="name"
      :class="$style.theName"
    )
    section(
      :class="$style.section"
      key="list"
    )
      BaseTypography(
        :level="3"
        text="人名漢字を探す（外部リンク）"
        :class="$style.sectionTitle"
      )
      ul(:class="$style.linkList")
        li(
          :class="$style.li"
          v-for="(val, index) in nameList"
          :key="index"
        )
          LinkButtonWithIcon(
            iconName="ExternalLinkIcon"
            :text="val"
            :url="`${kanjiLink}${val}`"
            :class="$style.button"
          )
</template>
<style lang="scss" module src="./index.scss"></style>
