import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

const PageTitle = (props) => {
    const {
        pageTitleStyle,
        pageTitleBackground,
        pageTitleShadow,
        titleHeading,
        children
    } = props;

    return (
        <>
            <div
                className={clsx('app-page-title', pageTitleStyle, pageTitleBackground, {
                'app-page-title--shadow': pageTitleShadow
                })}>
                <div>
                    <div className="px-4 app-page-title--first">
                        <div className="app-page-title--heading" style={{color: "#54A283"}}>
                        <h1>{titleHeading}</h1>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center">{children}</div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    pageTitleStyle: state.ThemeOptions.pageTitleStyle,
    pageTitleBackground: state.ThemeOptions.pageTitleBackground,
    pageTitleShadow: state.ThemeOptions.pageTitleShadow,
    pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
    pageTitleDescription: state.ThemeOptions.pageTitleDescription
});

export default connect(mapStateToProps)(PageTitle);
