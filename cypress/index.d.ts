/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Signs up a user and logs in.
     * @example cy.createUser(overrides)
     */
    createUser(
      overrides?: Partial<import('./types/IUser').default>,
    ): Chainable<import('./types/IUser').default>

    /**
     * Adds a homework to the database.
     * @example cy.addHomework(overrides)
     */
    addHomework(
      overrides?: Partial<import('./types/IHomework').default>,
    ): Chainable<import('./types/IHomework').default>

    /**
     * Fills and send add homework drawer.
     * @example cy.fillAddHomeworkDrawer(homework, additionalActions)
     */
    fillAddHomeworkDrawer(
      homework: Omit<import('./types/IHomework').default, 'createdBy'>,
      additionalActions?: () => void,
    ): Chainable<Element>

    /**
     * Fills and send edit homework drawer.
     * @example cy.fillAddHomeworkDrawer(homework, additionalActions)
     */
    fillEditHomeworkDrawer(
      homework: Omit<import('./types/IHomework').default, 'createdBy'>,
      additionalActions?: () => void,
    ): Chainable<Element>

    /**
     * Checks for the existance of one homework card.
     *
     * Note: only one card can be on the panel.
     *
     * @example cy.assertHomeworkCard(user, homework)
     */
    assertHomeworkCard(
      user: Partial<import('./types/IUser').default>,
      homework: Omit<import('./types/IHomework').default, 'createdBy'>,
    ): Chainable<Element>

    /**
     * Adds an evaluation to the database.
     * @example cy.addEvaluation(overrides)
     */
    addEvaluation(
      overrides?: Partial<import('./types/IEvaluation').default>,
    ): Chainable<import('./types/IEvaluation').default>

    /**
     * Fills and send add evaluation drawer.
     * @example cy.fillAddEvaluationDrawer(homework, additionalActions)
     */
    fillAddEvaluationDrawer(
      evaluation: Omit<import('./types/IEvaluation').default, 'createdBy'>,
      additionalActions?: () => void,
    ): Chainable<Element>

    /**
     * Fills and send edit evaluation drawer.
     * @example cy.fillAddEvaluationDrawer(homework, additionalActions)
     */
    fillEditEvaluationDrawer(
      evaluation: Omit<import('./types/IEvaluation').default, 'createdBy'>,
      additionalActions?: () => void,
    ): Chainable<Element>

    /**
     * Checks for the existance of one homework card.
     *
     * Note: only one card can be on the panel.
     *
     * @example cy.assertHomeworkCard(user, homework)
     */
    assertEvaluationCard(
      user: Partial<import('./types/IUser').default>,
      evaluation: Omit<import('./types/IEvaluation').default, 'createdBy'>,
    ): Chainable<Element>

    /**
     * Adds a course to the database.
     * @example cy.createUser(overrides)
     */
    addCourse(
      overrides?: Partial<import('./types/course').ICourse>,
    ): Chainable<import('./types/course').ICourse>

    /**
     * Changes current course day to specified date
     * @example cy.changeToCourseDay('MON')
     */
    changeToCourseDay(day: string): Chainable<Element>

    /**
     * Gets user email on MailHog.
     * @example cy.getUserEmail('foo@bar.com')
     */
    getUserEmail(email: string): Chainable<Element>

    /**
     * Closes welcome modal.
     * @example cy.closeWelcome()
     */
    closeWelcome(): Chainable<Element>

    /**
     * Confirms dashboard route.
     * @example cy.assertDashboardHome()
     */
    assertDashboardHome(): Chainable<Element>

    /**
     * Removes service workers added by Create React App and Firebase
     * @example cy.unregisterServiceWorkers()
     */
    unregisterServiceWorkers(): Chainable<Element>
  }
}
