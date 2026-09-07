import {blockContent} from './schemaTypes/blockContent'
import {category} from './schemaTypes/category'
import {post} from './schemaTypes/post'
import {author} from './schemaTypes/author'
import profile from './schemaTypes/profile'
import product from './schemaTypes/product'
import order from './schemaTypes/order'

export const schema = {
  types: [post, author, category, profile, product, order, blockContent],
}
