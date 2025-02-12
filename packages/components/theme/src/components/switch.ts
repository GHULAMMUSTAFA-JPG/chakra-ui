import { switchAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { calc, cssVar, mode } from "@chakra-ui/theme-tools"

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys)

const $width = cssVar("switch-track-width")
const $height = cssVar("switch-track-height")
const $diff = cssVar("switch-track-diff")
const diffValue = calc.subtract($width, $height)
const $translateX = cssVar("switch-thumb-x")

const baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props

  return {
    borderRadius: "full",
    p: "0.5",
    width: [$width.reference],
    height: [$height.reference],
    transitionProperty: "common",
    transitionDuration: "fast",
    bg: mode("gray.300", "whiteAlpha.400")(props),
    _focusVisible: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    _checked: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
    },
  }
})

const baseStyleThumb = defineStyle({
  bg: "white",
  transitionProperty: "transform",
  transitionDuration: "normal",
  borderRadius: "inherit",
  width: [$height.reference],
  height: [$height.reference],
  _checked: {
    transform: `translateX(${$translateX.reference})`,
  },
})

const baseStyle = definePartsStyle((props) => ({
  container: {
    [$diff.variable]: diffValue,
    [$translateX.variable]: $diff.reference,
    _rtl: {
      [$translateX.variable]: calc($diff).negate().toString(),
    },
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb,
}))

const sizes = {
  sm: definePartsStyle({
    container: {
      [$width.variable]: "1.375rem",
      [$height.variable]: "sizes.3",
    },
  }),
  md: definePartsStyle({
    container: {
      [$width.variable]: "1.875rem",
      [$height.variable]: "sizes.4",
    },
  }),
  lg: definePartsStyle({
    container: {
      [$width.variable]: "2.875rem",
      [$height.variable]: "sizes.6",
    },
  }),
}

export const switchTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "md",
    colorScheme: "blue",
  },
})
