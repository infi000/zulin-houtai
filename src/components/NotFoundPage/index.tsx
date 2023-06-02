import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function NotFoundPage() {
  return (
    <h2>
      <FormattedMessage {...messages.notFoundText} />
    </h2>
  );
}
