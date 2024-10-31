import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  app: {
    enableDynamicTitle: true,
  },
  menu: {
    mode: 'single',
    enableSubMenuCollapseButton: true,
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
