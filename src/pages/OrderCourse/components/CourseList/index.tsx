import { Button, Image, List } from 'antd-mobile'

import { ICourse } from '@/types'
import { ImgUtils } from '@/utils'

import styles from './index.module.scss'

interface IProps {
  data: ICourse[]
}

/**
 * 课程列表
 */
const CourseList = ({ data }: IProps) => {
  const onOrder = (courseId: string) => {}

  return (
    <div className={styles.container}>
      <List>
        {data.map(course => (
          <List.Item
            key={course.id}
            prefix={
              <Image
                className={styles.cover}
                src={ImgUtils.getThumb({
                  url: course.coverUrl,
                  w: 200,
                  h: 100,
                })}
                alt="课程图片"
              />
            }
            description={course.teachers?.map(t => t.nickname).join(',')}
            extra={
              <Button
                fill="none"
                color="primary"
                onClick={() => {
                  onOrder(course.id)
                }}
              >
                预约
              </Button>
            }
          >
            {course.name}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default CourseList
