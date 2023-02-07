import React, { useEffect, useState } from 'react'
import { API } from '../constants/api.constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { IAboutUs } from '../models/core.model';

const AboutUs = () => {
  useDocumentTitle('About Us');
  const [info, setInfo] = useState<IAboutUs>({info: ''});
  useEffect(() => {
    fetchInfo();
  }, []);

  async function fetchInfo() {
    const result = await fetch(`${API.HOST}/info`);
    const {data} = await result.json();
    setInfo(data);
  }
  return (
    <div dangerouslySetInnerHTML={{__html: info?.info}}></div>
  )
}

export default AboutUs