import { motion } from 'framer-motion'
import { SliderContainer, Slider } from '../animation'

function SlideEffect({ title }) {
  return (
    <motion.div>
      <motion.div variants={SliderContainer}>
        <Frame1 variants={Slider}></Frame1>
        <Frame2 variants={Slider}></Frame2>
        <Frame3 variants={Slider}></Frame3>
        <Frame4 variants={Slider}></Frame4>
      </motion.div>
    </motion.div>
  )
}

//Frame Animation
const Frame1 = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 10%;
  width: 100%;
  height: 100vh;
  background: #fffebf;
  z-index: 2;
`
const Frame2 = styled(Frame1)`
  background: #ff8efb;
`
const Frame3 = styled(Frame1)`
  background: #8ed2ff;
`
const Frame4 = styled(Frame1)`
  background: #240370;
`

export default SlideEffect
