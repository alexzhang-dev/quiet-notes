# Agent notes

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject
```

- `type` is required. `scope` is optional.
- Subject is imperative, lowercase, no trailing period.
- One logical change per commit. Add a body only when the subject cannot carry the why.

### Types

| Type | When |
| --- | --- |
| `feat` | User-visible behavior |
| `fix` | Bug fix |
| `style` | Visual / CSS, no behavior change |
| `refactor` | Structure only |
| `docs` | README, comments, content copy |
| `chore` | Tooling, deps, config |
| `perf` | Performance |

### Scopes

Optional. Use only when it narrows the change: `theme`, `header`, `content`, `css`, `prose`.

### Examples

```
fix(theme): interpolate --bg so html and body fade together
style(header): fade sticky chrome instead of a hard bar
chore: remove unused subscribe form
```

```
# bad — sentence summary, stacked changes, title case
Unify theme fade, soften the sticky header, and drop the unused subscribe form.
Update styles
```
