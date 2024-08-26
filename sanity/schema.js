import {blockContent} from './schemaTypes/blockContent'
import {category} from './schemaTypes/category'
import {post} from './schemaTypes/post'
import {author} from './schemaTypes/author'
import profile from './schemaTypes/profile'

export const schema = {
  types: [post, author, category, profile, blockContent],
}
