function PageForm({ formTitle, saveButtonText, children, onSubmit }) {

  return (
    <>
      <h2 className="sign-page__title">{formTitle}</h2>
      <form
        className="sign-page__form"
        name="sign-page__form"
        onSubmit={onSubmit}
        noValidate>
          <fieldset className="sign-page__fieldset">
            {children}
            <button
              type="submit"
              className="sign-page__save-button">{saveButtonText}
            </button>
          </fieldset>
      </form>
    </>
  )
}

export default PageForm;