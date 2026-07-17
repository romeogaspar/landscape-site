import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schemaTypes'
import {structure} from './structure'

const SINGLETON_TYPES = new Set(['siteSettings', 'homePage', 'aboutPage'])

export default defineConfig({
  name: 'default',
  title: 'Freelance Landscaping',

  projectId: '05yxfa3p',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schema.types,
  },

  document: {
    // Singletons can't be created or deleted from the global "+" menu
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
      }
      return prev
    },
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({action}) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : prev,
  },
})
