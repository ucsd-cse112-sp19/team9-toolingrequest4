console.log('loaded github');

addMetrics("github", {  // TODO: add metric fetchers
    available: { 
        total: {},
        past_week: {},
    },
    key: "username",
});
