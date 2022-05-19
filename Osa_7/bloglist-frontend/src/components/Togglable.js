import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Box } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  Togglable.displayName = 'Togglable'

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Button onClick={toggleVisibility} variant="contained">
            {props.label}
          </Button>
        </Box>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant="outlined" sx={{ my: 1 }}>
          cancel
        </Button>
      </div>
    </div>
  )
})
export default Togglable
