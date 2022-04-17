import { ReactComponent as TwitterIcon } from '../../img/icons/twitter.svg';
import { gtm } from '../../services/gtm';

export interface TwitterProps {
  from: string;
}

export const Twitter = (props: TwitterProps) => {

  const handleLinkClick = () => {
    gtm.openTwitter(props.from);
  };

  return (
    <>
      <div className="inline-block align-middle w-4 mr-1 text-light-primary-600 dark:text-dark-primary-500">
        <TwitterIcon />
      </div>
      <a
        className="align-middle text-light-primary-600 dark:text-dark-primary-500"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/${process.env.REACT_APP_TWITTER}`}
        onClick={handleLinkClick}
      >
        @{process.env.REACT_APP_TWITTER}
      </a><span className="align-middle"> to get notifications</span>
    </>
  );
};
