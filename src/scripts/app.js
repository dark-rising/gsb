/**
 * Module loader
 * @param {object} modules
 */
const bootstrap = (modules) => modules.forEach((module) => module.create());

// =============================================================================
// Modules
// =============================================================================

/**
 * Module example
 * @returns {{create: create}}
 */
const module = () => {
  const create = () => {
    // eslint-disable-next-line no-console
    console.log('Module created');
  };

  return {
    create,
  };
};

window.addEventListener('DOMContentLoaded', bootstrap([module()]));
