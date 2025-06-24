# Supabase Edge Functions

## Local Development & Testing

- Edge Functions use Deno and the `std/server` import, which will show errors in local TypeScript tools but work correctly when deployed via the Supabase CLI or dashboard.
- To test locally, use the Supabase CLI:

```sh
supabase functions serve hello-world
```

- To deploy:

```sh
supabase functions deploy hello-world
```

- See the main project README for CI integration and automated tests.
