import React from "react";
import { publications } from "../../data/publications";
import "../../styles/common/CardList.css";

const Publications: React.FC = () => {
  // Format publication in APA style
  const formatAPACitation = (pub: (typeof publications)[0]) => {
    // Format authors to use only first initial (Last, F.)
    const formatAuthor = (author: string) => {
      const parts = author.split(", ");
      if (parts.length === 2) {
        // Already in "Last, First" format, but ensure first name is initial only
        const lastName = parts[0];
        const firstInitial = parts[1].charAt(0) + ".";
        return `${lastName}, ${firstInitial}`;
      } else {
        // Convert "First Last" to "Last, F."
        const nameParts = author.split(" ");
        const lastName = nameParts.pop() || "";
        const firstInitials = nameParts
          .map((name) => `${name.charAt(0)}.`)
          .join(" ");
        return `${lastName}, ${firstInitials}`;
      }
    };

    // Format all authors
    const formattedAuthorsList = pub.authors.map(formatAuthor);

    // Use et al. for more than 3 authors
    const formattedAuthors =
      formattedAuthorsList.length > 3
        ? `${formattedAuthorsList[0]} et al.`
        : formattedAuthorsList.join(", ");

    return `${formattedAuthors} (${pub.year}). ${pub.title}.`;
  };

  return (
    <div className="card-list-container">
      <ul className="card-list">
        {publications.map((publication: (typeof publications)[0], index: number) => (
          <li key={index} className="card-item">
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              <p className="publication-citation">
                {formatAPACitation(publication)}
                <span className="journal-name"> {publication.journal}</span>
                {publication.volume ? `, ${publication.volume}` : ''}
                {publication.issue ? `(${publication.issue})` : ''}
                {publication.pages ? `, ${publication.pages}` : ''}
                .
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Publications;