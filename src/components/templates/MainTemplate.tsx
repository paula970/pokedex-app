import React from "react";

interface MainTemplateProps {
  header: React.ReactNode;
  searchBar: React.ReactNode;
  content: React.ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({
  header,
  searchBar,
  content,
}) => (
  <div className="main-template">
    {header}
    {searchBar}
    {content}
  </div>
);

export default MainTemplate;