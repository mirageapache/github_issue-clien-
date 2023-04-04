import { NavLink } from "react-router-dom";
import 'styles/css/list.css'

export default function IssueList({ listData }){

  const data_item = listData.map((item,index) => {
    const link = `/detail?id=${item.number}}`
    return <IssueItem key={item.id} index={index} data={item} link={link} />
  })

  return(
    <>
      <table class="table table-striped">
        <thead>
          <tr>
            <th className="item_num" scope="col">#</th>
            <th className="item_title" scope="col">標題</th>
            <th className="item_content" scope="col">內容</th>
            <th className="item_date" scope="col">建立日期</th>
          </tr>
        </thead>
        <tbody>
          {data_item}
        </tbody>
      </table>
    </>
  )
}

function IssueItem({ index, data, link }){
  return(
    <>
      <tr>
        <th className="num" scope="row">{index+1}</th>
        <td className="title">
          <NavLink className='title_link' to={link}>
            {data.title}
          </NavLink>
        </td>
        <td className="content">{data.body}</td>
        <td className="date">{data.created_at.substring(0,10)}</td>
        {/* <td className="operate">
          <button className="btn btn-primary">修改</button>
          <button className="btn btn-danger">刪除</button>
        </td> */}
      </tr>
    </>
  )
}