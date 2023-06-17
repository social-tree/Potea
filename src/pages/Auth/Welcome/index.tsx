import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import * as Styled from './Welcome.styles'
import React, { useEffect, useRef, useState } from 'react'

import { AuthStackParamList } from 'src/navigators/AuthNavigator/AuthNavigator.types'
import { Button } from 'src/components/Elements/Button'
import Carousel from 'react-native-reanimated-carousel'
import Dots from 'react-native-dots-pagination'
import { StackScreenProps } from '@react-navigation/stack'
import { theme } from 'src/styles/theme'

const WelcomeCourselScreens = [
  {
    text: 'We provide high quality plants just for you',
    image: require('src/assets/img/WelcomeSlideOne.png'),
  },
  {
    text: 'Your satisfaction is our number one priority',
    image: require('src/assets/img/WelcomeSlideTwo.png'),
  },
  {
    text: "Let's Shop Your Favorite Plants with Potea Now!",
    image: require('src/assets/img/WelcomeSlideThree.png'),
  },
]

export const Welcome = ({
  navigation,
}: StackScreenProps<AuthStackParamList, 'Welcome'>) => {
  const WelcomeFadeAnim = useRef(new Animated.Value(1)).current
  const carouselRef = useRef(null)
  const { width, height } = Dimensions.get('window')
  const [focusedImage, setFocusedImage] = useState(0)
  const [WelcomeFadeFinished, setWelcomeFadeFinished] = useState(false)

  useEffect(() => {
    Animated.timing(WelcomeFadeAnim, {
      toValue: 0,
      duration: 300,
      delay: 3000,
      useNativeDriver: true,
    }).start(() => setWelcomeFadeFinished(true))
  }, [WelcomeFadeAnim])

  return (
    <>
      <StatusBar />
      <Styled.Container>
        <Styled.WelcomeContainer
          style={{
            opacity: WelcomeFadeAnim,
            display: WelcomeFadeFinished ? 'none' : 'flex',
          }}
        >
          <Styled.WelcomeBackgroundContainer>
            <Styled.WelcomeBackground
              resizeMode="contain"
              resizeMethod="auto"
              source={require('src/assets/img/WelcomePlant.png')}
            />
          </Styled.WelcomeBackgroundContainer>
          <Styled.WelcomeInfo
            colors={[
              'transparent',
              '#181a2060',
              '#181a2084',
              '#181a20da',
              '#181a20',
            ]}
          >
            <Styled.WelcomeText>Welcome to 👋</Styled.WelcomeText>
            <Styled.Title>Potea</Styled.Title>
            <Styled.WelcomeDescription>
              The best plant e-commerce & online store app of the century for
              your needs!
            </Styled.WelcomeDescription>
          </Styled.WelcomeInfo>
        </Styled.WelcomeContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Carousel
            ref={carouselRef}
            width={width}
            enabled={false}
            height={height - 150}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              paddingTop: 30,
            }}
            loop={false}
            data={WelcomeCourselScreens}
            scrollAnimationDuration={300}
            onSnapToItem={(index) => setFocusedImage(index)}
            renderItem={({
              item,
            }: {
              item: { text: string; image: ImageSourcePropType }
            }) => (
              <Styled.WelcomeSlideContainer>
                <Image
                  style={{ height: height - 400, width: '100%' }}
                  resizeMode="cover"
                  source={item.image}
                />
                <Styled.WelcomeSlideText>{item.text}</Styled.WelcomeSlideText>
                <Dots
                  activeColor={theme.primary[500]}
                  passiveColor={theme.darkColors.dark2}
                  alignDotsOnXAxis
                  activeDotWidth={32}
                  active={focusedImage}
                  length={WelcomeCourselScreens.length}
                />
              </Styled.WelcomeSlideContainer>
            )}
          />
          <Styled.ButtonContainer>
            <Styled.StyledButton
              onPress={() =>
                focusedImage !== 2
                  ? carouselRef?.current?.next()
                  : navigation.navigate('AuthMethod')
              }
              enableShadow
            >
              Next
            </Styled.StyledButton>
          </Styled.ButtonContainer>
        </SafeAreaView>
      </Styled.Container>
    </>
  )
}
