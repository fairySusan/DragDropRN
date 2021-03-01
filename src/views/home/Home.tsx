import React from 'react'
import './home.less'
import {DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd'

export default class Home extends React.Component {
  constructor (props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onBeforeCapture = () => {
    /*...*/
  };

  onBeforeDragStart = () => {
    /*...*/
  };

  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    console.log('jjjj')
    // the only one that is required
  };
 getItemStyle = (isDragging, draggableStyle) => ({
    width: '30%',
    height: '100px',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });
  render () {
    return (
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Droppable droppableId="droppable">
            {
              (provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Draggable draggableId="1" index={0}>
                    {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={this.getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          item 1
                        </div>
                      )}
                  </Draggable>
                  <Draggable draggableId="2" index={1}>
                    {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={this.getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          item 2
                        </div>
                      )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
    )
  }
}