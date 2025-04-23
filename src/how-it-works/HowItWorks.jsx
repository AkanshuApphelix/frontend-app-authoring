import React, { useState, useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import messages from './messages';
import './HowItWorks.scss';

const HowItWorks = () => {
  const intl = useIntl();
  const [activeModal, setActiveModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const studioName = 'Studio';
  const studioShortName = 'Studio';
  const platformName = 'Open edX';
  
  // Get the base URL for images with proper handling for all deployment scenarios
  const getImageUrl = (imageName) => {
    // In development mode
    if (process.env.NODE_ENV === 'development') {
      // When running locally with a dev server
      return `/authoring/images/${imageName}`;
    }
    // In production deployment, construct the full path properly
    const baseUrl = getConfig().LMS_BASE_URL || '';
    const publicPath = getConfig().PUBLIC_PATH || '/authoring/';
    return `${baseUrl}${publicPath}images/${imageName}`;
  };
  
  // Add document class for proper styling
  useEffect(() => {
    document.body.classList.add('view-howitworks', 'not-signedin');
    return () => {
      document.body.classList.remove('view-howitworks', 'not-signedin');
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // Add modal-open class to body when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const openModal = (modalId) => {
    setActiveModal(modalId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsModalOpen(false);
  };

  return (
    <div className="index view-howitworks not-signedin">
      <Helmet>
        <title>{intl.formatMessage(messages.welcome)}</title>
      </Helmet>

      {/* Studio Header */}
      <header className="studio-header">
        <div className="wrapper-l">
          <div className="left-side">
            <div className="studio-logo">
              <img src={getImageUrl('studio-logo.png')} alt="Studio" />
            </div>
          </div>
          <div className="right-side">
            <ul className="nav-links">
              <li>
                <a href="#" className="help-link">
                  <FormattedMessage
                    id="howitworks.help"
                    defaultMessage="Help"
                  />
                </a>
              </li>
              <li>
                <a href="/register" className="sign-up">
                  <FormattedMessage
                    id="howitworks.signup"
                    defaultMessage="Sign Up"
                  />
                </a>
              </li>
              <li>
                <a href="/login" className="sign-in">
                  <FormattedMessage
                    id="howitworks.signin"
                    defaultMessage="Sign In"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="wrapper-content-header wrapper">
        <section className="content content-header">
          <header>
            <h1>
              <span className="wrapper-text-welcome">
                <FormattedMessage
                  id="howitworks.welcomeToStudio"
                  defaultMessage="Welcome to {studioName}"
                  values={{ studioName }}
                />
              </span>
            </h1>
            <p className="tagline">
              <FormattedMessage
                id="howitworks.studioHelpsManage"
                defaultMessage="{studioName} helps manage your online courses, so you can focus on teaching them"
                values={{ studioName: studioShortName }}
              />
            </p>
          </header>
        </section>
      </div>

      <div className="wrapper-content-features wrapper">
        <section className="content content-features">
          <header>
            <h2 className="sr">
              <FormattedMessage
                id="howitworks.studioManyFeatures"
                defaultMessage="{studioName}'s Many Features"
                values={{ studioName: studioShortName }}
              />
            </h2>
          </header>

          <ol className="list-features">
            {/* Feature 1 */}
            <li className="feature">
              <figure className="img">
                <a 
                  href="#hiw-feature1" 
                  onClick={(e) => { e.preventDefault(); openModal('hiw-feature1'); }}
                >
                  <img 
                    src={getImageUrl('thumb-hiw-feature1.png')} 
                    alt={intl.formatMessage(messages.feature1AltText, { studioName: studioShortName })} 
                  />
                  <figcaption className="sr">
                    <FormattedMessage
                      id="howitworks.studioHelpsOrganize"
                      defaultMessage="{studioName} Helps You Keep Your Courses Organized"
                      values={{ studioName }}
                    />
                  </figcaption>
                  <span className="action-zoom">
                    <span className="icon" aria-hidden="true">
                      <FontAwesomeIcon icon={faSearchPlus} />
                    </span>
                    <span className="sr">
                      <FormattedMessage
                        id="howitworks.enlargeImage"
                        defaultMessage="Enlarge image"
                      />
                    </span>
                  </span>
                </a>
              </figure>

              <div className="copy">
                <h3>
                  <FormattedMessage
                    id="howitworks.keepingCourseOrganized"
                    defaultMessage="Keeping Your Course Organized"
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="howitworks.courseBackbone"
                    defaultMessage="The backbone of your course is how it is organized. {studioName} offers an <strong>Outline</strong> editor, providing a simple hierarchy and easy drag and drop to help you and your students stay organized."
                    values={{
                      studioName: studioShortName,
                      strong: (chunks) => <strong>{chunks}</strong>,
                    }}
                  />
                </p>

                <ul className="list-proofpoints">
                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.simpleOrganization"
                        defaultMessage="Simple Organization For Content"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.studioUsesSimpleHierarchy"
                        defaultMessage="{studioName} uses a simple hierarchy of <strong>sections</strong> and <strong>subsections</strong> to organize your content."
                        values={{
                          studioName: studioShortName,
                          strong: (chunks) => <strong>{chunks}</strong>,
                        }}
                      />
                    </p>
                  </li>

                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.changeYourMind"
                        defaultMessage="Change Your Mind Anytime"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.draftYourOutline"
                        defaultMessage="Draft your outline and build content anywhere. Simple drag and drop tools let you reorganize quickly."
                      />
                    </p>
                  </li>

                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.goAWeek"
                        defaultMessage="Go A Week Or A Semester At A Time"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.buildAndRelease"
                        defaultMessage="Build and release <strong>sections</strong> to your students incrementally. You don't have to have it all done at once."
                        values={{
                          strong: (chunks) => <strong>{chunks}</strong>,
                        }}
                      />
                    </p>
                  </li>
                </ul>
              </div>
            </li>

            {/* Feature 2 - Text on left, image on right (true zig-zag pattern) */}
            <li className="feature even">
              <div className="copy">
                <h3>
                  <FormattedMessage
                    id="howitworks.learningMoreThanLectures"
                    defaultMessage="Learning is More than Just Lectures"
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="howitworks.studioLetsYouWeave"
                    defaultMessage="{studioName} lets you weave your content together in a way that reinforces learning. Insert videos, discussions, and a wide variety of exercises with just a few clicks."
                    values={{ studioName: studioShortName }}
                  />
                </p>

                <ul className="list-proofpoints">
                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.createLearningPathways"
                        defaultMessage="Create Learning Pathways"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.helpYourStudents"
                        defaultMessage="Help your students understand one concept at a time with multimedia, HTML, and exercises."
                      />
                    </p>
                  </li>

                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.workVisually"
                        defaultMessage="Work Visually, Organize Quickly"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.workVisuallyAndSee"
                        defaultMessage="Work visually and see exactly what your students will see. Reorganize all your content with drag and drop."
                      />
                    </p>
                  </li>

                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.broadLibrary"
                        defaultMessage="A Broad Library of Problem Types"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.moreThanMultipleChoice"
                        defaultMessage="It's more than just multiple choice. {studioName} supports more than a dozen types of problems to challenge your learners."
                        values={{ studioName: studioShortName }}
                      />
                    </p>
                  </li>
                </ul>
              </div>
              
              <figure className="img">
                <a 
                  href="#hiw-feature2" 
                  onClick={(e) => { e.preventDefault(); openModal('hiw-feature2'); }}
                >
                  <img 
                    src={getImageUrl('thumb-hiw-feature2.png')} 
                    alt={intl.formatMessage(messages.feature2AltText)} 
                  />
                  <figcaption className="sr">
                    <FormattedMessage
                      id="howitworks.learningMoreThanLectures"
                      defaultMessage="Learning is More than Just Lectures"
                    />
                  </figcaption>
                  <span className="action-zoom">
                    <span className="icon" aria-hidden="true">
                      <FontAwesomeIcon icon={faSearchPlus} />
                    </span>
                    <span className="sr">
                      <FormattedMessage
                        id="howitworks.enlargeImage"
                        defaultMessage="Enlarge image"
                      />
                    </span>
                  </span>
                </a>
              </figure>
            </li>

            {/* Feature 3 */}
            <li className="feature">
              <figure className="img">
                <a 
                  href="#hiw-feature3" 
                  onClick={(e) => { e.preventDefault(); openModal('hiw-feature3'); }}
                >
                  <img 
                    src={getImageUrl('thumb-hiw-feature3.png')} 
                    alt={intl.formatMessage(messages.feature3AltText, { studioName: studioShortName })} 
                  />
                  <figcaption className="sr">
                    <FormattedMessage
                      id="howitworks.studioGivesYouSimple"
                      defaultMessage="{studioName} Gives You Simple, Fast, and Incremental Publishing. With Friends."
                      values={{ studioName: studioShortName }}
                    />
                  </figcaption>
                  <span className="action-zoom">
                    <span className="icon" aria-hidden="true">
                      <FontAwesomeIcon icon={faSearchPlus} />
                    </span>
                    <span className="sr">
                      <FormattedMessage
                        id="howitworks.enlargeImage"
                        defaultMessage="Enlarge image"
                      />
                    </span>
                  </span>
                </a>
              </figure>

              <div className="copy">
                <h3>
                  <FormattedMessage
                    id="howitworks.simpleFastIncremental"
                    defaultMessage="Simple, Fast, and Incremental Publishing. With Friends."
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="howitworks.studioWorksLike"
                    defaultMessage="{studioName} works like web applications you already know, yet understands how you build curriculum. Instant publishing to the web when you want it, incremental release when it makes sense. And with co-authors, you can have a whole team building a course, together."
                    values={{ studioName: studioShortName }}
                  />
                </p>

                <ul className="list-proofpoints">
                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.instantChanges"
                        defaultMessage="Instant Changes"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.caughtABug"
                        defaultMessage="Caught a bug? No problem. When you want, your changes go live when you click Save."
                      />
                    </p>
                  </li>

                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.releaseOnDate"
                        defaultMessage="Release-On Date Publishing"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.whenYouveFinished"
                        defaultMessage="When you've finished a <strong>section</strong>, pick when you want it to go live and {studioName} takes care of the rest. Build your course incrementally."
                        values={{
                          studioName: studioShortName,
                          strong: (chunks) => <strong>{chunks}</strong>,
                        }}
                      />
                    </p>
                  </li>

                  <li className="proofpoint">
                    <h4 className="title">
                      <FormattedMessage
                        id="howitworks.workInTeams"
                        defaultMessage="Work in Teams"
                      />
                    </h4>
                    <p>
                      <FormattedMessage
                        id="howitworks.coAuthorsHave"
                        defaultMessage="Co-authors have full access to all the same authoring tools. Make your course better through a team effort."
                      />
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </section>
      </div>

      {/* CTA Section */}
      <div className="wrapper-content-cta wrapper">
        <section className="content content-cta">
          <header>
            <h2 className="sr">
              <FormattedMessage
                id="howitworks.signUpForStudio"
                defaultMessage="Sign Up for {studioName} Today!"
                values={{ studioName: studioShortName }}
              />
            </h2>
          </header>

          <div className="list-actions">
            <a href="/register" className="action action-primary">
              <FormattedMessage
                id="howitworks.signUpAndStart"
                defaultMessage="SIGN UP & START MAKING YOUR {platformName} COURSE"
                values={{ platformName }}
              />
            </a>
            <div className="action-secondary-wrapper">
              <a href="/login" className="action action-secondary">
                <FormattedMessage
                  id="howitworks.alreadyHaveAccount"
                  defaultMessage="Already have a {studioName} Account? Sign In"
                  values={{ studioName: studioShortName }}
                />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Studio Footer */}
      <footer className="studio-footer">
        <div className="wrapper-footer-content">
          <div className="copyright">
            <p>
              <FormattedMessage
                id="howitworks.copyright"
                defaultMessage=" {year} {platformName}, Inc."
                values={{ 
                  year: new Date().getFullYear(),
                  platformName
                }}
              />
            </p>
            <p className="trademark-text">
              <FormattedMessage
                id="howitworks.trademark"
                defaultMessage="edX, Open edX, and the edX and Open edX logos are registered trademarks of edX Inc."
              />
            </p>
          </div>
          <div className="footer-info">
            <div className="footer-links">
              <ul>
                <li>
                  <a id="lms-link" href="http://local.openedx.io:8000">
                    <FormattedMessage
                      id="howitworks.lms"
                      defaultMessage="LMS"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="powered-by">
              <img alt="Powered by Open edX" src="https://logos.openedx.org/open-edx-logo-tag.png" />
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Windows */}
      {isModalOpen && (
        <>
          <div className="modal-cover" onClick={closeModal}></div>
          
          {activeModal === 'hiw-feature1' && (
            <div className="content-modal" id="hiw-feature1">
              <h3 className="title">
                <FormattedMessage
                  id="howitworks.outlineTitle"
                  defaultMessage="Outlining Your Course"
                />
              </h3>
              <figure>
                <img src={getImageUrl('hiw-feature1.png')} alt="" />
                <figcaption className="description">
                  <FormattedMessage
                    id="howitworks.outlineDescription"
                    defaultMessage="Simple two-level outline to organize your course. Drag and drop, and see your course at a glance."
                  />
                </figcaption>
              </figure>

              <a href="#" onClick={(e) => { e.preventDefault(); closeModal(); }} className="action action-modal-close">
                <span className="icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
                <span className="label">
                  <FormattedMessage
                    id="howitworks.closeModal"
                    defaultMessage="close modal"
                  />
                </span>
              </a>
            </div>
          )}

          {activeModal === 'hiw-feature2' && (
            <div className="content-modal" id="hiw-feature2">
              <h3 className="title">
                <FormattedMessage
                  id="howitworks.moreThanJustLecturesTitle"
                  defaultMessage="More than Just Lectures"
                />
              </h3>
              <figure>
                <img src={getImageUrl('hiw-feature2.png')} alt="" />
                <figcaption className="description">
                  <FormattedMessage
                    id="howitworks.moreThanJustLecturesDescription"
                    defaultMessage="Quickly create videos, text snippets, inline discussions, and a variety of problem types."
                  />
                </figcaption>
              </figure>

              <a href="#" onClick={(e) => { e.preventDefault(); closeModal(); }} className="action action-modal-close">
                <span className="icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
                <span className="label">
                  <FormattedMessage
                    id="howitworks.closeModal"
                    defaultMessage="close modal"
                  />
                </span>
              </a>
            </div>
          )}

          {activeModal === 'hiw-feature3' && (
            <div className="content-modal" id="hiw-feature3">
              <h3 className="title">
                <FormattedMessage
                  id="howitworks.publishingToolsTitle"
                  defaultMessage="Publishing Tools"
                />
              </h3>
              <figure>
                <img src={getImageUrl('hiw-feature3.png')} alt="" />
                <figcaption className="description">
                  <FormattedMessage
                    id="howitworks.publishingToolsDescription"
                    defaultMessage="Publish your content on your schedule, making it available when you want, for whom you want."
                  />
                </figcaption>
              </figure>

              <a href="#" onClick={(e) => { e.preventDefault(); closeModal(); }} className="action action-modal-close">
                <span className="icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
                <span className="label">
                  <FormattedMessage
                    id="howitworks.closeModal"
                    defaultMessage="close modal"
                  />
                </span>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HowItWorks;
