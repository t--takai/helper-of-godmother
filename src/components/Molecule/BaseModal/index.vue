<script src="./index.js"></script>
<template lang="pug">
  div(
    :class="$style.baseLayer"
    @click.self.stop="closeModal()"
  )
    div(
      :class="$style.scrollArea"
      @click.self.stop="closeModal()"
    )
      section(:class="$style.container")
        div(:class="$style.header")
          h1(:class="$style.headerText")
            BaseFeatherIcon(
              iconName="EditIcon"
              iconSize="1.5x"
              :class="$style.icon"
            )
            span {{ title }}
          button(
            :class="$style.closeButton"
            @click.stop="closeModal()"
          )
            BaseFeatherIcon(
              iconName="XIcon"
              iconSize="24"
            )
        div(:class="$style.body")
          slot
</template>
<style lang="scss" src="./index.scss" module></style>
