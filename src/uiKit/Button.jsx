import React from 'react'
import { Button } from '@material-ui/core';
import styled from "styled-components"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


// Stylyed component overwritting/adding css to the passed in Button component imported from Material UI
// '&&&' is to overwrite the css namespace as the most specific selector so that the styles are applied over Material UI's
const BaseButton = styled(Button)`
  &&& {
    font-weight: 600;
    color: #FFFFFF;
    text-transform: none;
  }
`

const ApprovedBaseButton = styled(Button)`
  &&& {
    font-weight: 600;
    color: #FFFFFF;
    text-transform: none;
    background-color: #01BE85;
  }
`
const DoneCircleIcon = styled(CheckCircleOutlineIcon)`
  padding-left: 5px;
`


export const PrimaryButton = ({ children }) => (
  <BaseButton variant="contained" color="primary">{children}</BaseButton>
)

export const SecondaryButton = ({ children }) => (
  <BaseButton variant="contained" color="secondary">{children}</BaseButton>
)

export const TertiaryButton = ({ children }) => (
  <BaseButton variant="contained" color="default">{children}</BaseButton>
)

export const ApprovedButton = ({ children }) => (
  <ApprovedBaseButton variant="contained" color="#01BE85">
    {children}
    <DoneCircleIcon />
  </ApprovedBaseButton>
)