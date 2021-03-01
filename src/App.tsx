import React from 'react'
import {DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd'
import './views/home/home.less'
import {deepTraverseById} from './utils/deepTraverse'

export default class App extends React.Component<any, any> {
  constructor (props) {
    super(props);
    this.state = {
      layout: { 
        name: 'dropRoot',
        dropStyle: {display: 'flex', justifyContent: 'spaceBetween', width: '100%'},
        type: 'ROOT',
        children: [
        {
          name: 'side',
          dropStyle: {},
          className: 'side-bar ',
          type: 'SIDE',
          children: []
        },
        {
          name: 'main',
          dropStyle: {},
          type: 'MAIN',
          className: 'main-panel',
          children: [
            {name: 'block1',dropStyle: {display: 'flex', justifyContent: 'spaceBetween'}, children: [
              {name: 'news',dropStyle: {},className: 'buisness-block'},
              {name: 'notice', dropStyle: {},className: 'buisness-block'}
            ], className: 'block', type: 'BLOCK',},
            {name: 'block2',dropStyle: {display: 'flex', justifyContent: 'spaceBetween'}, children: [
              {name: 'run', dropStyle: {}, className: 'buisness-block'},
              {name: 'email',dropStyle: {},className: 'buisness-block'}
            ], className: 'block', type: 'BLOCK',}
        ]}
      ]},
    }
  }

  onDragEnd = (result) => {
    console.log(result)
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      this.setState((state) => {
        let {layout} = state
        let rootChildren = layout.children
        if (result.source.droppableId  === 'dropRoot') {
          layout.children = this.reorder(rootChildren, result.source.index, result.destination.index);
        } else {
          let drop = deepTraverseById(rootChildren,result.source.droppableId)
          drop.children = this.reorder(drop.children, result.source.index, result.destination.index);
        }
        return {
          layout: layout
        }
      })
    } else {
      this.setState((state) => {
        let {layout} = state
        let rootChildren = layout.children
        const soruceDrop = deepTraverseById(rootChildren,result.source.droppableId)
        const desDrop = deepTraverseById(rootChildren, result.destination.droppableId)
        this.reParent(soruceDrop.children, desDrop.children, result.source.index,result.destination.index)
        return {
          layout: layout
        }
      })
    }
  };

  // 跨父组件拖拽
  reParent = (sourceList, desList, sourceIndex, desIndex) => {
    const [removed] = sourceList.splice(sourceIndex, 1)
    desList.splice(desIndex, 0, removed)
  }

  // 同父组件内拖拽
  reorder = (list, startIndex, endIndex) => {
    if (list.length === 0) return []
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  renderLayout = (obj) => {
    return (
      <Droppable droppableId={obj.name} direction="horizontal" type={obj.type}>
        {
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={obj.dropStyle}
              {...provided.droppableProps}
            >
              {
                obj.children.map((item, i) => (
                  <Draggable key={item.name} draggableId={item.name} index={i}>
                    {
                      (provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={item.className}
                        >
                          {item.name}
                          {item.children && this.renderLayout(item)}
                        </div>
                      )
                    }
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    )
  }

  getItemStyle = (isDragging, draggableStyle, dragId) => {
    const width = dragId === 'side' ? '10%' : '88%';
    const backgroundColor = dragId === 'main' ? 'pink' : 'deeppink'
    return {
      width,
      backgroundColor,
      padding: '20px',
      ...draggableStyle
      }
    };
    getListStyle = isDraggingOver => ({
      width: '100%'
    });

  render () {
    const {layout} = this.state
    return (
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
         { this.renderLayout(layout) }
        </DragDropContext>
    )
  }
}