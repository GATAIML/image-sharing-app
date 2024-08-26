import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md p-4 sticky bottom-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-gray-800">
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/bhuvan-a-r/"
            className="font-bold text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bhuvan AR
          </a>
        </span>
        <div className="space-x-4">
          <a
            href="https://www.linkedin.com/in/bhuvan-a-r/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a
            href="https://github.com/bhuvan-a-r"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
