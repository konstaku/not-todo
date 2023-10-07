import { useContext, useRef } from 'react';
import { TodolistContext } from './context';
import { ACTIONS } from './todoReducer';
import {
  Card,
  Button,
  CardBody,
  Checkbox,
  Input,
  Text,
} from '@chakra-ui/react';

export function ToDoItem({ id, name, checked, isEdit, isPinned }) {
  const editRef = useRef();
  const { dispatch } = useContext(TodolistContext);

  if (!name) return;

  return (
    <Card className="card" margin={'.5rem 0.1rem'}>
      <CardBody className="list-item" p={['.5rem', '.75rem', '1rem']}>
        {isEdit ? (
          <form
            className="edit-wrapper"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({
                type: ACTIONS.EDIT_TODO,
                payload: { id, name: editRef.current.value },
              });
            }}
          >
            <Input
              type="text"
              defaultValue={name}
              autoFocus
              autoComplete="off"
              className="input"
              ref={editRef}
              onKeyUp={(e) => {
                if (e.code === 'Escape') {
                  dispatch({
                    type: ACTIONS.TOGGLE_EDIT,
                    payload: { id, isEdit },
                  });
                }
              }}
            />
            <Button type="submit" size={'xs'}>
              Save
            </Button>
          </form>
        ) : (
          <label className="list-item-label">
            <Checkbox
              className="checkbox"
              colorScheme="green"
              data-list-item-checkbox
              defaultChecked={checked}
              size={'lg'}
              onChange={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_CHECKED,
                  payload: { id, checked },
                })
              }
            />
            <Text
              textDecoration={checked ? 'line-through' : 'none'}
              _hover={{ textDecoration: 'line-through' }}
              className="text"
              fontSize={'lg'}
              fontWeight={isPinned && 'bold'}
            >
              {name}
            </Text>
          </label>
        )}
        <div className="edit-delete">
          {!checked && (
            <Button
              type="button"
              size={'xs'}
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_PIN,
                  payload: { id, isPinned },
                })
              }
            >
              {isPinned ? 'Unpin' : 'Pin'}
            </Button>
          )}
          <Button
            type="button"
            size={'xs'}
            data-button-edit
            onClick={() =>
              dispatch({ type: ACTIONS.TOGGLE_EDIT, payload: { id, isEdit } })
            }
          >
            Edit
          </Button>
          <Button
            type="button"
            size={'xs'}
            data-button-delete
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } })
            }
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
