import React, { useEffect, useState } from 'react'
import { API } from '../constants/api.constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const AboutUs = () => {
  useDocumentTitle('About Us');
  const [info, setInfo] = useState({info: ''});
  useEffect(() => {
    fetchInfo();
  }, []);
  async function fetchInfo() {
    const result = await fetch(`${API.HOST}/info`);
    const {data} = await result.json() as any;
    setInfo(data);
  }
  return (
    <div dangerouslySetInnerHTML={{__html: info?.info}}></div>
  )
}

export default AboutUs