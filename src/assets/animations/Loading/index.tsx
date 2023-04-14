import { LoadingLottie } from './Loading.styles'
import { theme } from 'src/styles/theme'

interface Props {
  style?: any
}

export const Loading = ({ style = [{}], ...props }: Props) => {
  return (
    <LoadingLottie
      {...props}
      autoPlay
      style={style}
      colorFilters={[
        {
          keypath: 'Shape Layer 2',
          color: theme.primary[500],
        },
        {
          keypath: 'Shape Layer 1',
          color: theme.primary[500],
        },
      ]}
      loop
      source={require('./json/loading.json')}
    />
  )
}
