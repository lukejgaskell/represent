import { Appearance, ColorSchemeName } from "react-native"
import { useEffect, useState } from "react"

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange)

    return () => {
      Appearance.removeChangeListener(onColorSchemeChange)
    }
  }, [])

  function onColorSchemeChange() {
    setColorScheme(Appearance.getColorScheme())
  }

  return colorScheme as NonNullable<ColorSchemeName>
}
