import React from 'react'
import {render, screen} from 'test/test-utils'
import FullPageErrorFallback from 'components/FullPageErrorFallback'

describe('FullPageErrorFallback', () => {
  test('displays error', () => {
    const error = new Error('Oh no!')
    render(<FullPageErrorFallback error={error} />, {
      route: '/some-other-route',
    })

    screen.getByText('Something Went Wrong')
    screen.getByText('A fatal error has ocurred. Please refresh.')
    screen.getByRole('link', {name: 'Back Home'})
  })

  test('renders correctly', () => {
    const error = {
      request: {
        response: {
          status: 500,
        },
      },
    }

    // @ts-ignore
    const {container} = render(<FullPageErrorFallback requestError={error} />)
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        min-height: 100vh;
      }

      .c0 > *:first-of-type {
        margin: 0 auto;
      }

      <div>
        <div
          class="ant-result ant-result-error c0"
        >
          <div
            class="ant-result-icon"
          >
            <span
              aria-label="close-circle"
              class="anticon anticon-close-circle"
              role="img"
            >
              <svg
                aria-hidden="true"
                class=""
                data-icon="close-circle"
                fill="currentColor"
                focusable="false"
                height="1em"
                viewBox="64 64 896 896"
                width="1em"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
                />
              </svg>
            </span>
          </div>
          <div
            class="ant-result-title"
          >
            Error
          </div>
          <div
            class="ant-result-subtitle"
          >
            A fatal error has ocurred. Please refresh.
          </div>
          <div
            class="ant-result-extra"
          >
            <button
              class="ant-btn ant-btn-primary"
              type="button"
            >
              <a
                href="/"
              >
                Back Home
              </a>
            </button>
          </div>
        </div>
      </div>
    `)
  })
})
