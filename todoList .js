import React from 'react';
import '../src/todolist.css'
import storage from '../src/Storage/Storage'

class todoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[
                {
                    title:"running",
                    isck:false
                },
                {
                    title:"reading",
                    isck:true
                }
            ]
        };
    }
    //页面加载就会触发  渲染完成
    componentDidMount(){
        //读取缓存
        let data=storage.getStorage("lists");
        //第一次刷新的时候，data不存在，给list赋值以后,map无法遍历，因此在这里需判断data是否存在
        if(data){
            this.setState({
                list:data
            });
        }
    }
    //回车事件
    keyEnter=(e)=>{
        if(e.which===13){
            let ele=e.target;
            let listinfo={
                title:ele.value,
                isck:false
            }
            let newlist=this.state.list;
            newlist.push(listinfo);
            this.setState({
                list:newlist
            });
            ele.value=""
            storage.setStorage("lists",newlist);
        };
    }
    //监听事件 
    changeBox=(index)=>{
        let data=this.state.list;
        data[index].isck=!data[index].isck;
        this.setState({
            list:data
        });
        storage.setStorage("lists",data);
    }
    //删除事件
    deleteData=(index)=>{
        let data=this.state.list;
        data.splice(index,1);
        this.setState({
            list:data
        });
        storage.setStorage("lists",data);
    }
    render() {
        return (
            <div className="block">
                <div className="title">
                    <div className="titleleft"><h2>ToDoList</h2></div>
                    <div className="titleright">
                        <input type="text" onKeyPress={this.keyEnter}/>
                    </div>
                </div>
                <hr/>
                <div>
                    <ul>
                        <h3>未完成</h3>
                        {
                            this.state.list.map((v,k)=>{
                                if(!v.isck){
                                    return (
                                        <div key={k}>
                                            <li><input type="checkbox" checked={v.isck} onChange={this.changeBox.bind(this,k)}/>{v.title}--------<button onClick={this.deleteData.bind(this,k)}>删除</button></li>
                                        </div>
                                    )
                                }
                                return ""
                            })
                        }
                        <h3>已完成</h3>
                        {
                            this.state.list.map((v,k)=>{
                                if(v.isck){
                                    return (
                                        <div key={k}>
                                            <li><input type="checkbox" checked={v.isck} onChange={this.changeBox.bind(this,k)}/>{v.title}--------<button onClick={this.deleteData.bind(this,k)}>删除</button></li>
                                        </div>
                                    )
                                }
                                return ""
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
export default todoList;