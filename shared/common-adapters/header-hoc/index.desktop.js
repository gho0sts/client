// @flow
import * as React from 'react'
import Text from '../text'
import BackButton from '../back-button'
import Box from '../box'
import Icon from '../icon'
import {collapseStyles, globalStyles, globalColors, globalMargins, desktopStyles} from '../../styles'
import type {Props} from './types'

export const HeaderHocHeader = ({
  headerStyle,
  customComponent,
  hideBackLabel,
  title,
  onCancel,
  onBack,
  theme = 'light',
}: Props) => (
  <Box style={collapseStyles([_headerStyle, _headerStyleThemed[theme], headerStyle])}>
    {customComponent}
    {onBack && (
      <BackButton
        key="back"
        hideBackLabel={hideBackLabel}
        onClick={onBack}
        style={{..._backButtonIconStyle, ..._backButtonIconStyleThemed[theme]}}
      />
    )}
    {onCancel && (
      <Icon
        style={collapseStyles([_styleClose, _styleCloseThemed[theme]])}
        type="iconfont-close"
        onClick={onCancel}
      />
    )}
    {title && (
      <Box style={_titleStyle}>
        <Text type="Header">{title}</Text>
      </Box>
    )}
  </Box>
)

function HeaderHoc<P: {}>(WrappedComponent: React.ComponentType<P>) {
  return (props: P & Props) => (
    <Box style={_containerStyle}>
      <HeaderHocHeader {...props} />
      <WrappedComponent {...(props: P)} />
    </Box>
  )
}

const _containerStyle = {
  ...globalStyles.flexBoxColumn,
  flex: 1,
}

const _headerStyle = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: 48,
  paddingLeft: globalMargins.small,
  paddingRight: globalMargins.small,
  position: 'relative',
}

const _headerStyleThemed = {
  dark: {
    backgroundColor: globalColors.darkBlue3,
  },
  light: {
    backgroundColor: globalColors.white,
  },
}

const _backButtonIconStyle = {
  position: 'absolute',
}

const _backButtonIconStyleThemed = {
  dark: {
    color: globalColors.white,
  },
  light: {
    color: globalColors.black_50,
  },
}

const _styleClose = {
  ...desktopStyles.clickable,
  position: 'absolute',
  right: globalMargins.small,
  top: globalMargins.small,
}

const _styleCloseThemed = {
  dark: {
    color: globalColors.white_40,
  },
  light: {
    color: globalColors.black_20,
  },
}

const _titleStyle = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
  bottom: 0,
  flex: 1,
  justifyContent: 'center',
  left: 0,
  position: 'absolute', // This is always centered so we never worry about items to the left/right. If you have overlap or other issues you likely have to fix the content
  right: 0,
  top: 0,
}

export default HeaderHoc
