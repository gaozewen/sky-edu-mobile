import { Avatar, Button, Card, Grid } from 'antd-mobile'

import { ICourse } from '@/types'

import styles from './index.module.scss'

interface IProps {
  data: ICourse[]
  onOrder: (courseId: string) => void
}

/**
 * 课程列表
 */
const CourseList = ({ data, onOrder }: IProps) => {
  return (
    <div className={styles.container}>
      {data.map(course => (
        <Card key={course.id} className={styles.card}>
          <div className={styles['store-name']}>{course.name}</div>
          <Grid columns={13} gap={10}>
            <Grid.Item span={2}>
              <Avatar
                src={((course.teachers || [])[0] || {}).avatar}
                style={{ width: '40px', height: '40px' }}
              />
            </Grid.Item>
            <Grid.Item span={8}>
              <div className={styles.teacher}>
                讲师：
                {((course.teachers || [])[0] || {}).nickname || '未知'}
              </div>
            </Grid.Item>
            <Grid.Item span={3}>
              <Button
                style={{ marginTop: '2px' }}
                fill="none"
                color="primary"
                onClick={() => {
                  onOrder(course.id)
                }}
              >
                预约
              </Button>
            </Grid.Item>
          </Grid>
        </Card>
      ))}
    </div>
  )
}

export default CourseList
