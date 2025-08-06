import PostList from '../components/PostList'
import { Typography, IconButton, Box } from '@mui/material'
import { ArrowDownAZ, CalendarArrowDown } from 'lucide-react'
import TagSearchBox from '../components/TagSearchBox'

const BlogPage = () => {
  return (
    <>
      {/* Blog 标题 */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ paddingLeft: 5, marginTop: '40px' }}
      >
        Blog
      </Typography>

      {/* 排序按钮区域 */}
      <Box sx={{ display: 'flex', gap: 1, paddingLeft: 5, marginBottom: 0 }}>
        <IconButton aria-label="Sort by title">
          <ArrowDownAZ size={20} />
        </IconButton>
        <IconButton aria-label="Sort by date">
          <CalendarArrowDown size={20} />
        </IconButton>
      </Box>

      {/* 主体内容区域 */}
      <Box sx={{ paddingLeft: 5, paddingRight: '400px' }}>
        <PostList />
      </Box>

      {/* 右侧悬浮导航栏 */}
      <TagSearchBox/>
    </>
  )
}

export default BlogPage
