import { IconBrandJava, IconCplusplus, IconJavascript, IconPython, IconTypescript } from '../mdx/icons'

interface ProgrammingLanguageIconProps {
  language: string
}

export function ProgrammingLanguageIcon({
  language,
  ...restProps
}: ProgrammingLanguageIconProps) {
  if (language === 'typescript' || language === 'ts' || language === 'tsx') {
    return <IconTypescript size={16} {...restProps} />
  }
  if (language === 'javascript' || language === 'js') {
    return <IconJavascript size={16} {...restProps} />
  }
  if (language === 'python' || language === 'py') {
    return <IconPython size={16} {...restProps} />
  }
  if (language === 'java') {
    return <IconBrandJava size={16} {...restProps} />
  }
  /*
  if (language === 'toml') {
    return <SiToml {...restProps} />
  }
  if (language === 'json') {
    return <SiJson {...restProps} />
  }
  if (language === 'yaml' || language === 'yml') {
    return <SiYaml {...restProps} />
  } */
  if (
    language === 'h'
    || language === 'c'
    || language === 'hpp'
    || language === 'cpp'
    || language === 'c++'
  ) {
    return <IconCplusplus size={16} {...restProps} />
  }
  throw new Error(`Unknown language: '${language}'`)
}
