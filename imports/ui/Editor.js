import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { PropTypes } from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      [e.target.name]: e.target.value}
    );
  }
  handleDelete() {
    Meteor.call('notes.remove', this.props.note._id);
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} name="title" placeholder="title" onChange={this.handleChange.bind(this)} />
          <textarea value={this.props.note.body} name="body" placeholder="Your text here" onChange={this.handleChange.bind(this)}></textarea>
          <button onClick={this.handleDelete.bind(this)}>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
            { this.props.selectedNoteId ? "Note not found." : "Pick or create a note to get started." }
        </p>
      );
    }
  }
};

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
