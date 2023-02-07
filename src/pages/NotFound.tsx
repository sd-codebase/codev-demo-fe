import React from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound = () => {
    useDocumentTitle('Page Not Found');
  return (
    <div>Page not found</div>
  )
}

export default NotFound