import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { Editor } from './Editor';

if (Meteor.isClient) {
  describe('Editor', function() {
    let call;
    let browserHistory;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.')
    });

    it('should render not found message', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('Note not found.')
    });

    it('should remove note', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      wrapper.find('button').simulate('click');

      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });

    it('should update the note body on textarea change', function() {
      const newBody = 'This is my new body text';
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      wrapper.find('textarea').simulate('change', {
        target: {
          name: "body",
          value: newBody
        }
      });
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });
    it('should update the note title on input change', function() {
      const newTitle = 'This is my new title';
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      wrapper.find('input').simulate('change', {
        target: {
          name: "title",
          value: newTitle
        }
      });
      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });
    it('should set state for new note', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('body')).toBe(notes[0].body);
      expect(wrapper.state('title')).toBe(notes[0].title);
    });
    it('should not set state if note prop not provided', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} />);

      expect(wrapper.state('body' && 'title')).toBe('');
    });
  });
}
