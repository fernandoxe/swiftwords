import { ReactComponent as ReferredIcon } from '../../img/icons/referred.svg';
import { gtm } from '../../services/gtm';

export interface ReferredProps {
  from: string;
}

export const Referred = (props: ReferredProps) => {

  const handleLinkClick = () => {
    gtm.openReferred(props.from);
  };

  return (
    <>
      <span className="align-middle">Try </span>
      <a
        className="align-middle underline text-light-primary-600 dark:text-dark-primary-500"
        href={`${process.env.REACT_APP_REFERRED_URL}`}
        onClick={handleLinkClick}
      >
        {process.env.REACT_APP_REFERRED_NAME}&nbsp;
        <div className="inline-block align-middle w-[1.375rem] text-light-primary-600 dark:text-dark-primary-500">
          <ReferredIcon />
        </div>
      </a>
    </>
  );
};
